import { useState } from 'react';

function Calcul() {
  const [input, setInput] = useState('');
  const [half, setHalf] = useState('');

  function reset() {
    setInput('0');
    setHalf('');
  }

  function del() {
    setInput(input.slice(0, -1));
  }

  function addDigit(digit) {
    if (digit === '0' && input === '0') return;
    if (digit !== '0' && input === '0') {
      setInput(digit);
      return;
    }
    setInput(input + digit);
  }

  function addOperator(operator) {
    if (input === '') return;
    setHalf(input + operator);
    setInput('');
  }

  return (
    <div className="flex flex-col items-center gap-4 border-2 py-4 border-gray-300 rounded-4xl w-40">
      <div className="flex flex-row">
        <input
          value={half}
          readOnly
          className="bg-gray-200 border-blue-200 shadow-xl w-16 text-right"
        />
        <input
          value={input}
          readOnly
          className="bg-gray-200 border-blue-200 shadow-xl w-16 text-right"
        />
      </div>
      <div className="grid gap-3 grid-cols-4 justify-between">
        <button onClick={reset}>C</button>
        <button onClick={reset}>clear</button>
        <button>uh..</button>
        <button onClick={del}>del</button>
      </div>
      <div className="grid grid-cols-4 gap-3 justify-between">
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('7')}>
          7
        </button>
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('8')}>
          8
        </button>
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('9')}>
          9
        </button>
        <button
          className="bg-blue-200 w-5 h-5"
          onClick={() => addOperator('/')}
        >
          /
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 justify-between">
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('4')}>
          4
        </button>
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('5')}>
          5
        </button>
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('6')}>
          6
        </button>
        <button
          className="bg-blue-200 w-5 h-5"
          onClick={() => addOperator('*')}
        >
          *
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 justify-between">
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('1')}>
          1
        </button>
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('2')}>
          2
        </button>
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('3')}>
          3
        </button>
        <button
          className="bg-blue-200 w-5 h-5"
          onClick={() => addOperator('-')}
        >
          -
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 justify-between ml-0">
        <button className="bg-blue-200 w-5 h-5" onClick={() => addDigit('0')}>
          0
        </button>
        <button
          className="bg-blue-200 w-5 h-5"
          onClick={() => addOperator('+')}
        >
          +
        </button>
        <button
          className="bg-blue-200 w-auto h-5 col-span-2"
          onClick={() => {
            try {
              setInput(eval(half + input).toString());
              setHalf('');
            } catch (error) {
              setInput('Error');
            }
          }}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calcul;
