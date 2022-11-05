import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { BlogCard } from "../../components/blog-card/blog-card.component";
export const Home = () => {
  const tags:string[] = ["C#"];
  return (
    <>
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
      <BlogCard tags={tags} name="Ionel Marcel" title="Interfaces in C#" img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam blanditiis et corrupti, dolorem esse commodi inventore, culpa obcaecati velit, sit molestiae reprehenderit dolorum dolore earum deleniti optio non expedita?" />
    </>
  );
}