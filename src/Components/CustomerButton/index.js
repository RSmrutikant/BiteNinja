import { Button } from 'antd';
import './index.css';
const index = (props) => {
  const { title, children, type = 'primary', onClick, shape } = props;
  return (
    <div className={type}>
      <Button
        block
        type="text"
        {...props}
        shape={shape}
        size={2}
        onClick={onClick}
        id="custom_button"
      >
        {title}
      </Button>
      {/* <Button type="text">Text</Button> */}
    </div>
  );
};

export default index;
