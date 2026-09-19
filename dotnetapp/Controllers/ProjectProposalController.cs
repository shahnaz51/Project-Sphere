using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Route("api/projectproposals")]
    [ApiController]
    [Authorize]
    public class ProjectProposalController : ControllerBase
    {
        private readonly ProjectProposalService _proposalService;

        public ProjectProposalController(
            ProjectProposalService proposalService)
        {
            _proposalService = proposalService;
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<IEnumerable<ProjectProposal>>>
            GetAllProjectProposals()
        {
            try
            {
                var proposals =
                    await _proposalService.GetAllProjectProposals();

                return Ok(proposals);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{proposalId}")]
        [Authorize(Roles = "Manager,Employee")]
        public async Task<ActionResult<ProjectProposal>>
            GetProjectProposalById(int proposalId)
        {
            try
            {
                var proposal =
                    await _proposalService
                    .GetProjectProposalById(proposalId);

                if (proposal == null)
                    return NotFound();

                return Ok(proposal);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult<IEnumerable<ProjectProposal>>>
            GetProjectProposalsByUserId(int userId)
        {
            try
            {
                var proposals =
                    await _proposalService
                    .GetProjectProposalsByUserId(userId);

                if (!proposals.Any())
                {
                    return NotFound();
                }

                return Ok(proposals);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult> AddProjectProposal([FromBody] ProjectProposal proposal)
        {
            try
            {
                await _proposalService.AddProjectProposal(proposal);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{proposalId}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult>
            UpdateProjectProposal(
                int proposalId,
                [FromBody] ProjectProposal proposal)
        {
            try
            {
                var result =
                    await _proposalService.UpdateProjectProposal(proposalId, proposal);

                if (!result)
                    return NotFound();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{proposalId}")]
        [Authorize(Roles = "Employee,Manager")]
        public async Task<ActionResult>
            DeleteProjectProposal(int proposalId)
        {
            try
            {
                var result =
                    await _proposalService
                    .DeleteProjectProposal(proposalId);

                if (!result)
                    return NotFound();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}