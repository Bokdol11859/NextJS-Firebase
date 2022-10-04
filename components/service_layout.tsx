import { Box, BoxProps } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import NavBar from "./NavBar";

interface ServiceLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps & BoxProps> = ({
  title = "blah x2",
  children,
  ...boxProps
}) => {
  return (
    <Box {...boxProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      {children}
    </Box>
  );
};

export default ServiceLayout;
