using System.ComponentModel.DataAnnotations;
using System.Linq;
using dotnetapp.Data;

namespace dotnetapp.Validations
{
    public class UniqueUsernameAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                return ValidationResult.Success;

            var dbContext = (ApplicationDbContext)validationContext
                .GetService(typeof(ApplicationDbContext));

            if (dbContext == null)
                return ValidationResult.Success;

            string username = value.ToString();

            bool exists = dbContext.Users.Any(u => u.Username == username);

            if (exists)
                return new ValidationResult("Username is already taken. Please choose another username.");

            return ValidationResult.Success;
        }
    }
}