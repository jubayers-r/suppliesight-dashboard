import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Filters({
  searchTerm,
  setSearchTerm,
  selectedWarehouse,
  setSelectedWarehouse,
  selectedStatus,
  setSelectedStatus,
  warehouses,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-2 items-center">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      {/* Warehouse Selector */}
      <div className="flex justify-center md:justify-start w-full">
        <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Warehouses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {warehouses.map((w) => (
              <SelectItem key={w.code} value={w.code}>
                {w.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Selector aligned to the end */}
      <div className="flex justify-center md:justify-end w-full">
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Healthy">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Healthy
            </SelectItem>
            <SelectItem value="Low">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
              Low
            </SelectItem>
            <SelectItem value="Critical">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              Critical
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
