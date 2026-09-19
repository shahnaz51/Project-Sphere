using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly RsaKeyService _rsaKeyService;

        public AuthService(
            ApplicationDbContext context,
            IConfiguration configuration,
            RsaKeyService rsaKeyService)
        {
            _context = context;
            _configuration = configuration;
            _rsaKeyService = rsaKeyService;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (existingUser != null)
            {
                return (0, "User already exists");
            }

            model.UserRole = role;

            // RSA Decrypt
            string plainPassword =
                _rsaKeyService.Decrypt(model.Password);

            // BCrypt Hash
            model.Password =
                BCrypt.Net.BCrypt.HashPassword(plainPassword);

            await _context.Users.AddAsync(model);
            await _context.SaveChangesAsync();

            return (1, "User registered successfully");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
            {
                return (0, "Email is not Registered.");
            }

            // RSA Decrypt
            string plainPassword =
                _rsaKeyService.Decrypt(model.Password);

            // BCrypt Verify
            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    plainPassword,
                    user.Password);

            if (!isPasswordValid)
            {
                return (0, "Invalid Password");
            }

            var claims = new List<Claim>
            {
                new Claim("userId", user.UserId.ToString()),
                new Claim("username", user.Username),
                new Claim("email", user.Email),
                new Claim("mobileNumber", user.MobileNumber),
                new Claim("userRole", user.UserRole),
                new Claim(ClaimTypes.Role, user.UserRole)
            };

            var token = GenerateToken(claims);

            return (1, token);
        }

        private string GenerateToken(
            IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]));// key form appsettings.json 

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}