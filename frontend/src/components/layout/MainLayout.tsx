import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }: any) {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar />
                <div style={{ padding: 20 }}>{children}</div>
            </div>
        </div>
    );
}
