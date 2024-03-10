import Footer from "../components/Footer";
import Header from "../components/Header"
import Hero from "../components/Hero";


interface Props {
    children: React.ReactNode ; 
}
const Layout = ({children} : Props) => {
    return(
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <Hero/>
            <div className="max-w-5xl m-auto py-10 flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout ;