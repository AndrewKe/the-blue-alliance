import * as XLSX from "xlsx";

const FileInput = ({
  onChange,
  clearInput = false,
}: {
  onChange: (sheet: XLSX.WorkSheet) => void;
  clearInput?: boolean;
}) => {
  const parseFMSReport = (event: any) => {
    const data = event.target.result;

    const workbook = XLSX.read(data, { type: "binary" });
    const firstSheet = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheet];

    onChange(sheet);
  };

  const onFileChange = (event: any) => {
    if (event?.target?.files?.length > 0) {
      const reader = new FileReader();
      reader.onload = parseFMSReport;
      reader.readAsBinaryString(event.target.files[0]);

      if (clearInput) {
        event.target.value = null;
      }
    }
  };

  return <input type="file" onChange={onFileChange} />;
};
export default FileInput;
