type Props = {
  title: string;
}

const FormTitle: React.FC<Props> = ({ title }) => (
  <div className="text-center mb-8">
    <h1 className="text-[24px]">{title}</h1>
  </div>
)

export default FormTitle
