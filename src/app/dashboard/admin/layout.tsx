"use client"

import { useAuth } from "@/app/context/auth-context";
import ResponsiveAppBar from "@/app/ui/Admin/AppBar";
import Sidebar from "@/app/ui/Admin/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {user , token , role , id}  = useAuth();
      const router = useRouter();
    
      useEffect(() => {
        if (!id || Number(role)!== 3 || token === undefined ) {
          router.push("/login");
        }
        console.log(user);
      },[user]);
  return (
    <>
    {/* <div className="d-flex "> */}
      <Row className="mx-0">
        <Col lg="2">
          <Sidebar/>
        </Col>
        <Col lg="10" md="12">
          <ResponsiveAppBar/>
          <div className="w-80 ">{children}</div>
        </Col>
      </Row>
    {/* </div> */}
    </>
  );
}
