import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FAQ = memo(() => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: "panel1",
      question: "What products and services does your showroom offer?",
      answer:
        "Our showroom provides a range of high-quality products and premium services, including ... (provide detailed information about products and services)",
    },
    {
      id: "panel2",
      question: "How can I search for products in your showroom?",
      answer:
        "To search for products in our showroom, you can use the search function on the website or browse through the product categories we offer.",
    },
    {
      id: "panel3",
      question:
        "How do I register for warranty for products purchased from the showroom?",
      answer:
        "To register for warranty for products purchased from the showroom, please visit the 'Warranty' page on our website and fill in the necessary information. The system will then guide you through the registration process.",
    },
    {
      id: "panel4",
      question: "How can I contact the support department of the showroom?",
      answer:
        "You can contact our support department by sending an email to support@showroom.com or calling the customer support phone number on the 'Contact' page. We will strive to respond as soon as possible.",
    },
    {
      id: "panel5",
      question: "Is there a return/exchange policy in your showroom?",
      answer:
        "We have a flexible return/exchange policy. If you are not satisfied with the product, you can exchange or return it within 30 days from the date of purchase. Please carefully read the return/exchange policy on our website for more details and applicable conditions.",
    },
  ];

  return (
    <Box component="section" sx={{ pb: 10 }}>
      <Paper sx={{ my: 10 }} elevation={0}>
        <Typography
          align="center"
          variant="h3"
          sx={{
            fontSize: ["1.5rem", "2.3rem", "3rem"],
          }}
          className="title-specs"
        >
          <span className="title-text">#Frequently Asked Questions</span>
        </Typography>
        <Container>
          {faqData.map((item, index) => (
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${item.id}-content`}
                id={`${item.id}-header`}
              >
                <Typography fontWeight={600} sx={{ color: "text.secondary" }}>
                  {`${index + 1}. ${item.question}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Paper>
    </Box>
  );
});
