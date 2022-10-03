import Head from "next/head";
import React from "react";

interface ServiceLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ServiceLayout = ({ title = "blah x2", children }: ServiceLayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default ServiceLayout;
