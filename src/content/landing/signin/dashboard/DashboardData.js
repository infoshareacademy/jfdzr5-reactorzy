import React from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";

const ContainerDashboardInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashboardInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  padding-left: 2%;
`;

const ContainerName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
`;

const Name = styled.h1`
  font-family: "Audiowide", cursive;
  font-size: 62px;
  letter-spacing: 2px;
  margin: 0;
  line-height: 100%;
`;

const SubTitle = styled.p`
  margin: 0;
  line-height: 100%;
  font-size: 10px;
`;

const InformationDashboard = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 22px;
`;

const Icon = styled.i`
  font-size: 44px;
  padding-right: 12px;
  color: #1565c0;
`;

const BoldInformation = styled.span`
  font-weight: bold;
  padding-right: 12px;
`;

// To-do: Add animation to counters

const DashboardData = ({ totalUsersRegistered, totalPosts }) => {
  return (
    <Paper elevation={14} sx={{ bgcolor: "#f0f2f5", height: "100%" }}>
      <ContainerDashboardInfo>
        <DashboardInfo>
          <ContainerName>
            <Name>Koffee</Name>
            <SubTitle>
              powered by <strong>Reactorzy</strong>
            </SubTitle>
          </ContainerName>
          <InformationDashboard>
            <Icon>
              <i className="fas fa-mail-bulk"></i>
            </Icon>
            <BoldInformation>{totalPosts}</BoldInformation>written posts
          </InformationDashboard>
          <InformationDashboard>
            <Icon>
              <i className="fas fa-users"></i>
            </Icon>
            <BoldInformation>{totalUsersRegistered}</BoldInformation> registered
            users
          </InformationDashboard>
        </DashboardInfo>
      </ContainerDashboardInfo>
    </Paper>
  );
};

export default DashboardData;
