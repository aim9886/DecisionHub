import { AddRounded, RuleRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RulesCard from "../components/cards/RulesCard";
import { getRules } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 0px;
  }
  background: ${({ theme }) => theme.bg};
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.div`
  width: 200px;
  padding: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ItemTitle = styled.div`
  display: flex;
  font-size: ${({ fontSize }) => fontSize || "22px"};
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: ${({ smallfontSize }) => smallfontSize || "18px"};
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  grid-gap: 16px 16px;
  margin-bottom: 20px;
`;

const Dashboard = ({ setOpenNewRule }) => {
  // Hooks
  const dispath = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [recentRules, setRecentRules] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReentRules = async () => {
    setLoading(true);
    const token = localStorage.getItem("decisionhub-token-auth-x4");
    await getRules(token)
      .then((res) => {
        setRecentRules(res.data);
        setLoading(false);
      })
      .catch((err) => {
        dispath(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getReentRules();
  }, []);

  return (
    <Container>
      <TopSection>
        <Flex>
          <Button onClick={() => setOpenNewRule(true)}>
            <AddRounded />
            Create New Rule
          </Button>
          <Button style={{ background: "#9747FF" }}>
            <RuleRounded />
            Test Rules
          </Button>
        </Flex>
      </TopSection>
      <ItemTitle>Recent Activity</ItemTitle>
      <CardWrapper>
        <RulesCard />
        <RulesCard />
        <RulesCard />
        <RulesCard />
        <RulesCard />
      </CardWrapper>
      <ItemTitle>New Rules</ItemTitle>
      <CardWrapper>
        {recentRules.length === 0 && (
          <ItemTitle fontSize="18px" smallfontSize="14px">
            No Rules Found
          </ItemTitle>
        )}
        {recentRules.map((rule) => (
          <RulesCard rule={rule} />
        ))}
      </CardWrapper>
    </Container>
  );
};

export default Dashboard;
