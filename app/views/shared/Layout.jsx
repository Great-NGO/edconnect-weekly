import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    console.log("Y");
    console.log(props);
    
    const {  user } = props;
    console.log(user);
    console.log('Z');
    return (
        <>
            <Header user ={user} />
                <main className="mx-auto">
                    {props.children};
                </main>
            <Footer/>
        </>
    )
}
export default Layout