type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div>
      <img src={picture} alt={name} height={30} width={30} />
      <div>{name}</div>
    </div>
  );
};

export default Avatar;
