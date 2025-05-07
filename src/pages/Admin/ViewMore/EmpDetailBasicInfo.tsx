interface EmpDetailBasicInfoProps {
    department?: string;
    projectCode: string;
  }
  
  const EmpDetailBasicInfo = ({ department, projectCode }: EmpDetailBasicInfoProps) => (
    <div className="grid grid-cols-2 gap-y-6 mb-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Department</h3>
        <p className="text-gray-900">{department || 'Not specified'}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Project Code</h3>
        <p className="text-gray-900">{projectCode}</p>
      </div>
    </div>
  );
  
  export default EmpDetailBasicInfo;
  