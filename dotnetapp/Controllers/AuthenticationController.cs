using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        //Constructor dependancey injection using constructor we are using iauthservice objest also it will call the auth service methods because we have created the object in program.cs file aslo it is loosly coupled 

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            try
            {
                var result =await _authService.Registration(model, model.UserRole);

                if (result.Item1 == 0)
                    return BadRequest(new { message = result.Item2 });

                return Ok(new { message = result.Item2 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginModel model)
        {
            try
            {
                var result =
                    await _authService.Login(model);

                if (result.Item1 == 0)
                    return BadRequest(
                        new { message = result.Item2 });

                return Ok(new
                {
                    token = result.Item2
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    new { message = ex.Message });
            }
        }
    }
}


    
