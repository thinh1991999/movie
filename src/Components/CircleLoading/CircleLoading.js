import "./CircleLoading.css";

function CircleLoading() {
  return (
    <div className="lds-roller">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
        return (
          <div
            key={item}
            className="after:dark:bg-white after:bg-gray-800"
          ></div>
        );
      })}
    </div>
  );
}

export default CircleLoading;
