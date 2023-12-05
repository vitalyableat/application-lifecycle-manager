import { EmployeeItem } from '@/components/ui';
import { getProjectByIdHandler } from '@/services/project/handlers';

const ProjectDetailsPage = async ({ params }: { params: { projectId: string } }) => {
  const project = await getProjectByIdHandler(params.projectId);

  return (
    <main className="flex flex-col gap-5 p-6 overflow-y-auto">
      <p className="text-xl font-bold text-center">Project Details</p>
      <div className="flex flex-col">
        <p className="text-md">
          <b>Status: </b>
          {project.status}
        </p>
        {project.description && (
          <p className="text-md whitespace-pre-wrap">
            <b>Description: </b>
            {project.description}
          </p>
        )}
      </div>
      {!!project.employees.length && (
        <>
          <p className="text-xl font-bold text-center">Project Team</p>
          <div className="flex gap-5 flex-wrap">
            {project.employees.map((employee) => (
              <EmployeeItem key={employee.id} employee={employee} withRedirect />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default ProjectDetailsPage;
