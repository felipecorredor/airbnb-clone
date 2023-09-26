"use client";

import React from "react";
import Container from "../Container";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/app/globals/categories";

const Categories = () => {
  const params = useSearchParams();
  const paramsCategory = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            selected={category.label === paramsCategory}
            {...category}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
