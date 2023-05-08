interface Props {
  nombre: string;
  email: string | null;
}

export default function NombreCol({ nombre, email }: Props) {
  return (
    <>
      <p>{nombre}</p>
      {email && <p className="text-gray-400">{email}</p>}
    </>
  );
}
