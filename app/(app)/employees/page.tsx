import { getDictionary, getServerLocale } from '@/dictionaries';

const EmployeesPage = async () => {
  const d = getDictionary(await getServerLocale());

  return <main className="flex h-full justify-center items-center">{d.pages.employees.selectEmployee}</main>;
};

export default EmployeesPage;
