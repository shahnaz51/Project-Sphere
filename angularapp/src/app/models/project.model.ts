export interface Project {
    projectId?: number;
    projectTitle: string;
    projectDescription?: string;
    startDate: string;
    endDate: string;
    frontEndTechStack: string;
    backendTechStack: string;
    database: string;
    status: string;
}