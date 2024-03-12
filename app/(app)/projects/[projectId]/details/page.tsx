import { EmployeeItem } from '@/components/ui';
import { getDictionary, getServerLocale } from '@/dictionaries';
import { getProjectByIdHandler } from '@/services/project/handlers';

const ProjectDetailsPage = async ({ params }: { params: { projectId: string } }) => {
  const d = getDictionary(await getServerLocale());
  const project = await getProjectByIdHandler(params.projectId);

  console.log(project);

  return (
    <main className="flex flex-col gap-5 p-6 overflow-y-auto">
      <p className="text-xl font-bold text-center">{d.pages.projects.projectDetails}</p>
      <div className="flex flex-col">
        <p className="text-md">
          <b>{d.pages.projects.status}</b>
          {d.pages.projects[project.status]}
        </p>
        <p className="text-md">
          <b>{d.pages.projects.lifecycleStep}</b>
          {d.pages.projects[project.lifecycleStep]}
        </p>
        {project.description && (
          <p className="text-md whitespace-pre-wrap">
            <b>{d.pages.projects.description}</b>
            {project.description}
          </p>
        )}
      </div>
      {!!project.employees.length && (
        <>
          <p className="text-xl font-bold text-center">{d.pages.projects.projectTeam}</p>
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
