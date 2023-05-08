interface Props {
  text: string;
}

export default function Header({ text }: Props) {
  return <span className="font-normal uppercase">{text}</span>;
}
