import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 3em;
  color: #478ba2;
  font-weight: bold;
  line-height: 1em;
`;

const Lead = styled.p`
  font-size: 2em;
  color: black;
  font-weight: normal;
  line-height: 1em;
`;

const Wrapper = styled.section`
  padding: 4em;
  text-align: center;
  background: white;
`;

const leadstyle= {
  marginTop : "2rem"
}

const Dashboard = () => {
  return (
    <div>
      <Wrapper>
        <Title>Welcome to the Admin Panel</Title>
        <Lead>
          <div style={leadstyle}>
          Checkout the sidebar to manage users and their bookings.
          </div>
        </Lead>
      </Wrapper>
    </div>
  );
};

export default Dashboard;
