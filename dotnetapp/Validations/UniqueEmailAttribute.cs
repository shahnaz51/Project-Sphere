using System.ComponentModel.DataAnnotations;
using System.Linq;
using dotnetapp.Data;

namespace dotnetapp.Validations
{
    public class UniqueEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                return ValidationResult.Success; // Let [Required] handle empty

            // Get DbContext from DI container
            var dbContext = (ApplicationDbContext)validationContext
                .GetService(typeof(ApplicationDbContext));

            if (dbContext == null)
                return ValidationResult.Success; // Skip if context unavailable (e.g., unit tests)

            string email = value.ToString();

            bool exists = dbContext.Users.Any(u => u.Email == email);

            if (exists)
                return new ValidationResult("Email is already registered. Please use a different email.");

            return ValidationResult.Success;
        }
    }
}