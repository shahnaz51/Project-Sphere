using dotnetapp.Data;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class ProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<Project> GetProjectById(int projectId)
        {
            return await _context.Projects
                .FirstOrDefaultAsync(x => x.ProjectId == projectId);
        }

        public async Task<bool> AddProject(Project project)
        {
            var existing = await _context.Projects
                .FirstOrDefaultAsync(x =>
                    x.ProjectTitle.ToLower() ==
                    project.ProjectTitle.ToLower());

            if (existing != null)
            {
                throw new ProjectException(
                    "Project with the same title already exists");
            }

            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateProject(int projectId, Project project)
        {
            var existing = await _context.Projects
                .FirstOrDefaultAsync(x => x.ProjectId == projectId);

            if (existing == null)
                return false;

            existing.ProjectTitle = project.ProjectTitle;
            existing.ProjectDescription = project.ProjectDescription;
            existing.StartDate = project.StartDate;
            existing.EndDate = project.EndDate;
            existing.FrontEndTechStack = project.FrontEndTechStack;
            existing.BackendTechStack = project.BackendTechStack;
            existing.Database = project.Database;
            existing.Status = project.Status;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteProject(int projectId)
        {
            var project = await _context.Projects
                .FirstOrDefaultAsync(x => x.ProjectId == projectId);

            if (project == null)
                return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}