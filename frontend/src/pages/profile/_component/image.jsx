export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "http://localhost:3001/api/pics/" + src;
  return <img {...rest} src={src} alt={""} />;
}
