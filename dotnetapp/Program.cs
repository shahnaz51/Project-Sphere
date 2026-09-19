using dotnetapp.Services;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();// controller will not work 

builder.Services.AddEndpointsApiExplorer();// for exposing api . the apis we hit it will hit all the apis in swagger using this 
builder.Services.AddSwaggerGen();// for adding swagger 

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

//NEW: Register RSA Key Service as Singleton
// Singleton = same key pair used throughout app lifetime
builder.Services.AddSingleton<RsaKeyService>(); // will use same object everytime because we have declared singleton 

// Services
builder.Services.AddScoped<IAuthService, AuthService>(); // wil use object for each web request 
builder.Services.AddScoped<ProjectService>(); // wil use object for each web request 
builder.Services.AddScoped<ProjectProposalService>();// wil use object for each web request 
builder.Services.AddScoped<FeedbackService>();// wil use object for each web request 

builder.Services.AddHttpContextAccessor(); 

// CORS
// Allowed origins come from config (appsettings.Development.json locally,
// environment variable Cors__AllowedOrigins__0 / __1 etc. in production)
// so we never ship "AllowAnyOrigin" to a public deployment.
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                      ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme =
        JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration["Jwt:Key"]))
        };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS middleware
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();