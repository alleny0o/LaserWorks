import { useState } from "react";
import styles from "./AllCategories.module.scss";
import CategoryModal from "./CategoryModal";

const AllCategories = ({ loading, error, categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.stickyHeader}>Current Categories</h1>
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {error && (
        <div className={styles.errorContainer}>
          <h3>Error Loading Categories</h3>
        </div>
      )}

      {categories && (
        <>
          <div className={styles.categoriesContainer}>
            {Array.isArray(categories) && categories.length > 0 ? (
              <div className={styles.allCategoriesGrid}>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={styles.categoryItem}
                    onClick={() => handleCategoryClick(category)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.categoryInfo}>
                      <span className={styles.categoryLabel}>Name:</span>
                      <span className={styles.categoryName}>{category.name}</span>
                      <span className={styles.categoryLabel}>Slug:</span>
                      <span className={styles.categorySlug}>{category.slug}</span>
                    </div>
                    <span className={styles.editText}>Click to edit</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't created any categories yet!</p>
            )}
          </div>
          <CategoryModal 
            isOpen={isModalOpen}
            category={selectedCategory}
            handleCloseModal={handleCloseModal}
          />
        </>
      )}
    </div>
  );
};

export default AllCategories;