using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Route("api/projects")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }
        
        [HttpGet]
        [Authorize(Roles = "Manager,Employee")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            try
            {
                var projects = await _projectService.GetAllProjects();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{projectId}")]
        [Authorize(Roles = "Manager,Employee")]
        public async Task<ActionResult<Project>> GetProjectById(int projectId)
        {
            try
            {
                var project = await _projectService.GetProjectById(projectId);

                if (project == null)
                    return NotFound();

                return Ok(project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> AddProject([FromBody] Project project)
        {
            try
            {
                var result = await _projectService.AddProject(project);

                if (result)
                    return Ok();

                return StatusCode(500, "Failed to add project");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{projectId}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> UpdateProject(
            int projectId,
            [FromBody] Project project)
        {
            try
            {
                var result = await _projectService
                    .UpdateProject(projectId, project);

                if (!result)
                    return NotFound("Project not found");

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{projectId}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> DeleteProject(int projectId)
        {
            try
            {
                var result = await _projectService
                    .DeleteProject(projectId);

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
