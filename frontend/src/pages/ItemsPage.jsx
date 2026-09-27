import React from 'react';
import { useParams } from 'react-router-dom';
import { Storefront } from '../components/storefront';

function ItemsPage() {
  const { category } = useParams();

  return (
    <div className="min-h-screen">
      <Storefront initialCategoryName={category} categoryOnly />
    </div>
  );
}

export default ItemsPage;
