---

## 📁 Project Architecture Overview

To fully explain the project architecture and folder structure, let's dive into the main sections:

- 🌐 **Overall Project Architecture**
- 📂 **Role of Each Layer and File**
- 🗂️ **Folder Structure and File Organization**

### 🌐 Overall Project Architecture

Your project is implemented based on **Layered Architecture** and **Domain-Driven Design (DDD)**. This architecture helps you maintain your code in an organized and scalable manner.

#### 🧱 Layers:

1. **Presentation Layer**: Handles incoming requests (e.g., GraphQL APIs) and responses.
2. **Application Layer**: Coordinates application operations and forwards requests to the Domain and Infrastructure layers.
3. **Domain Layer**: Contains core business logic and domain models.
4. **Infrastructure Layer**: Interacts with external systems like databases and third-party services.

### 📂 Role of Each Layer and File in the Project

#### 🧩 Presentation Layer

- `/api/graphql/typeDefs`: Contains GraphQL schema definitions that specify various types and operations (Query and Mutation).
  - `ProductTypeDef.js`: Defines types related to products.
  - `QueryTypeDef.js`: Defines types related to Queries (e.g., `getAllProducts`).
  - `MutationTypeDef.js`: Defines types related to Mutations (e.g., `addProduct`).
- `/api/graphql/resolvers`: Contains resolver code that processes GraphQL requests and refers them to the Application layer.
  - `ProductResolver.js`: Manages the logic for processing Queries and Mutations related to products.
- `/api/controllers`: If you have REST APIs, this is where the HTTP controllers reside, processing requests and sending them to the Application layer.
  - `server.js`: Sets up the Express server and Apollo Server (GraphQL) and acts as the interface between requests and responses.

#### 🛠️ Application Layer

- `/application/services`: Application services that coordinate and execute business logic.
  - `ProductService.js`: Manages operations related to products, such as retrieving all products or adding a new one.
- `/application/dto`: Data Transfer Objects (DTOs) used for transferring data between layers.
  - `ProductDTO.js`: Objects related to product data that are transferred between layers.
- `/application/use-cases`: This is where specific application use cases are placed, each representing a specific operation.
  - `GetProductUseCase.js`: An example of a use case for retrieving a product by a specific ID.

#### 🧠 Domain Layer

- `/domain/entities`: Domain entities representing core business concepts.
  - `Product.js`: A class representing a product, including logic for calculating discounts and other product-related operations.
- `/domain/repositories`: Interfaces for repositories that the Infrastructure layer implements.
  - `IProductRepository.js`: Interface for the product repository, implemented by the Infrastructure layer.
- `/domain/value-objects`: Value Objects representing specific, immutable characteristics.
  - `Price.js`: Represents a price object, managing related operations.

#### 🌉 Infrastructure Layer

- `/infrastructure/persistence/repositories`: Repository implementations that connect to databases or external systems.
  - `ProductRepository.js`: Implements the product repository, handling operations related to storing and retrieving products from the database.
- `/infrastructure/persistence/orm`: Manages database connection and ORM settings (e.g., using Sequelize or Mongoose).
  - `db.js`: The file related to database configurations.
- `/infrastructure/external-services`: External services interacting with third-party APIs.
  - `ThirdPartyService.js`: An example of an external service interacting with third-party APIs.

---
