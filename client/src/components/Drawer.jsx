import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft } from "lucide-react";

export default function Drawer({
  open,
  onOpenChange,
  selectedProduct,
  warehouses,
  updateDemandValue,
  setUpdateDemandValue,
  transferQty,
  setTransferQty,
  transferTo,
  setTransferTo,
  handleUpdateDemand,
  handleTransferStock,
  getProductStatus,
  getStatusVariant
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Product Details</SheetTitle>
            <SheetDescription>
              View and manage product inventory details
            </SheetDescription>
          </SheetHeader>

          {selectedProduct && (
            <div className="mt-6 space-y-6">
              {/* Product Info */}
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  {selectedProduct.name}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-medium">{selectedProduct.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warehouse:</span>
                    <span className="font-medium">
                      {selectedProduct.warehouse}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <span className="font-medium">{selectedProduct.stock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Demand:</span>
                    <span className="font-medium">
                      {selectedProduct.demand}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={getStatusVariant(
                        getProductStatus(selectedProduct)
                      )}
                    >
                      {getProductStatus(selectedProduct)}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Update Demand Form */}
              <div>
                <h4 className="font-medium mb-3">Update Demand</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="demand">New Demand</Label>
                    <Input
                      id="demand"
                      type="number"
                      value={updateDemandValue}
                      onChange={(e) => setUpdateDemandValue(e.target.value)}
                      placeholder="Enter new demand"
                    />
                  </div>
                  <Button onClick={handleUpdateDemand} className="w-full">
                    Update Demand
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Transfer Stock Form */}
              <div>
                <h4 className="font-medium mb-3">Transfer Stock</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="warehouse">Destination Warehouse</Label>
                    <Select value={transferTo} onValueChange={setTransferTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses
                          .filter((w) => w.code !== selectedProduct.warehouse)
                          .map((w) => (
                            <SelectItem key={w.code} value={w.code}>
                              {w.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity to Transfer</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={transferQty}
                      onChange={(e) => setTransferQty(e.target.value)}
                      max={selectedProduct.stock}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <Button
                    onClick={handleTransferStock}
                    disabled={
                      !transferTo ||
                      !transferQty ||
                      parseInt(transferQty) > selectedProduct.stock
                    }
                    className="w-full"
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Transfer Stock
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
}