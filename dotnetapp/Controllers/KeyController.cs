using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/key")]
    public class KeyController : ControllerBase
    {
        private readonly RsaKeyService _rsaKeyService;

        public KeyController(RsaKeyService rsaKeyService)
        {
            _rsaKeyService = rsaKeyService;
        }

        /// <summary>
        /// GET api/key/public
        /// Returns the RSA public key for Angular to encrypt passwords with.
        /// </summary>
        [HttpGet("public")]
        public IActionResult GetPublicKey()
        {
            return Ok(new { publicKey = _rsaKeyService.GetPublicKey() });
        }
    }
}