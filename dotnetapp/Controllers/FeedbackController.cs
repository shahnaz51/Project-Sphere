using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Route("api/feedback")]
    [ApiController]
    [Authorize]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        public FeedbackController(
            FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<IEnumerable<object>>>
        GetAllFeedbacks()
        {
            try
            {
                var feedbacks =
                    await _feedbackService.GetAllFeedbacks();

                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult<IEnumerable<object>>>
            GetFeedbacksByUserId(int userId)
        {
            try
            {
                var feedbacks =
                    await _feedbackService
                    .GetFeedbacksByUserId(userId);

                if (!feedbacks.Any())
                {
                    return NotFound();
                }

                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult>
            AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                var result =
                    await _feedbackService
                    .AddFeedback(feedback);

                if (result)
                    return Ok();

                return StatusCode(
                    500,
                    "Failed to add feedback");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{feedbackId}")]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult>
            DeleteFeedback(int feedbackId)
        {
            try
            {
                var result =
                    await _feedbackService
                    .DeleteFeedback(feedbackId);

                if (!result)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}