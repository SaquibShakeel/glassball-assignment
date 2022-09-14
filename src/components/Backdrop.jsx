const Backdrop = (props) => {
  return (
    <div className="backdrop" onClick={() => props.setOpenAddCol(false)}></div>
  );
};

export default Backdrop;
