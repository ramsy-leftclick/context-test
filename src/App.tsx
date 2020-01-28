import {useContext} from 'react';
import * as React from 'react';
import './styles.css';

const _accounts: any = ['test', 'foo', 'bar', 'baz'];

export const TestContext = React.createContext<any>(null);

const TestProvider = (props: any) => {

    const mockSth = async (text: string) => {
        return Promise.resolve(_accounts.filter((f: any) => f.includes(text)));
    };

    return (
        <TestContext.Provider value={{mockSth}}>
            {props.children}
        </TestContext.Provider>
    );
};

export const Render = () => {

    const {mockSth} = useContext(TestContext)
    const [text, setText] = React.useState('');
    const [accounts, setAccounts] = React.useState([]);

    React.useEffect(() => {
        if (text) {
            mockSth(text)
                .then((res: any) => setAccounts(res));
        }
    }, [text]);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <h6>{text}</h6>
            <input onChange={e => setText(e.target.value)}/>
            <div id={'result'}>

                {accounts && accounts.map(f => {
                    return (
                        <div id={f}>
                            {f}
                            <br/>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default function App() {
    return (
        <TestProvider>
            <Render />
        </TestProvider>
    );
}
