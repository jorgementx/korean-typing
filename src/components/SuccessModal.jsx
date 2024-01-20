// "use client";
function SuccessModal({onDismiss}) {
  function handleClick() {
    onDismiss()
  }

  return (<>
  <div className="w-screen h-screen bg-black/40 fixed" onClick={handleClick}></div>
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-3xl w-96 h-96 p-4">
      <header>
        <h1>Success!</h1>
      </header>
      <p>Success message, statistics, time spent...</p>
    </div>
    </>
  )
}

export default SuccessModal