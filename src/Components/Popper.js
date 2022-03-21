function Popper({ mess }) {
  return (
    <div className="block relative bg-gray-600 after:absolute  after:content-[''] after:left-[50%] after:translate-x-[-50%] after:border-4 after:border-transparent after:border-t-black after:block">
      <p>{mess}</p>
    </div>
  );
}

export default Popper;
