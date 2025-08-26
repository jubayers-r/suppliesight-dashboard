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
      <SheetContent className="w-full max-w-[540px] p-6 bg-white shadow-lg rounded-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Product Details</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            View and manage product inventory details
          </SheetDescription>
        </SheetHeader>

        {selectedProduct && (
          <div className="mt-6 space-y-8">

            {/* Product Info */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-3">{selectedProduct.name}</h4>
              <div className="space-y-2">
                {["SKU", "Warehouse", "Stock", "Demand"].map((field) => (
                  <div key={field} className="flex justify-between">
                    <span className="text-gray-400">{field}:</span>
                    <span className="font-medium">
                      {selectedProduct[field.toLowerCase()]}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <Badge variant={getStatusVariant(getProductStatus(selectedProduct))}>
                    {getProductStatus(selectedProduct)}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Update Demand Form */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
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
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleUpdateDemand} className="w-full hover:bg-blue-600">
                  Update Demand
                </Button>
              </div>
            </div>

            <Separator />

            {/* Transfer Stock Form */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="font-medium mb-3">Transfer Stock</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="warehouse">Destination Warehouse</Label>
                  <Select value={transferTo} onValueChange={setTransferTo}>
                    <SelectTrigger className="mt-1">
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
                    placeholder={`Max: ${selectedProduct.stock}`}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={handleTransferStock}
                  disabled={!transferTo || !transferQty || parseInt(transferQty) > selectedProduct.stock}
                  className="w-full flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50"
                >
                  <ArrowRightLeft className="h-4 w-4" />
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
