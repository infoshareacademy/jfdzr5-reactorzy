import React from "react";
import styled from "styled-components";

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

const DashboardData = () => {
  return (
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
          <BoldInformation>6420</BoldInformation>written posts
        </InformationDashboard>
        <InformationDashboard>
          <Icon>
            <i className="fas fa-comments"></i>
          </Icon>
          <BoldInformation>526980</BoldInformation>written comments
        </InformationDashboard>
        <InformationDashboard>
          <Icon>
            <i className="fas fa-users"></i>
          </Icon>
          <BoldInformation>11</BoldInformation> registered users
        </InformationDashboard>
      </DashboardInfo>
    </ContainerDashboardInfo>
  );
};

export default DashboardData;
