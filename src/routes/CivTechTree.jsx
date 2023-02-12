import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CivData from "../data/CivData.json";
import "./CivTechtree.css";

export default function CivTechTree() {
  return CivData.civilizations.map((curData) => {
    console.log(curData);
    return (
      <div key={curData.key} id="cards">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component={"img"}
              image={curData.img}
              alt="Briton img"
              id="card-img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {curData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {curData.Description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" href="/build-orders/1">
              Build Orders
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  });
}
