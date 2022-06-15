const Signature = ({href, src, style}) => (
  <a href={href} target="_blank">
    <img src={src} style={{
      maxWidth: '5em',
      minWidth: '25%',
      }}/>
  </a>
)

export default Signature