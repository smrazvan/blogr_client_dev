import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { BlogCard } from "../../components/blog-card/blog-card.component";
export const Home = () => {
  const tags:string[] = ["C#"];
  return (
    <Box sx={{display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center"}}>
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
    </Box>
  );
}