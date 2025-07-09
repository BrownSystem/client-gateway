"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBranchProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_branch_product_dto_1 = require("./create-branch-product.dto");
class UpdateBranchProductDto extends (0, mapped_types_1.PartialType)(create_branch_product_dto_1.CreateBranchProductDto) {
    id;
}
exports.UpdateBranchProductDto = UpdateBranchProductDto;
//# sourceMappingURL=update-branch-product.dto.js.map