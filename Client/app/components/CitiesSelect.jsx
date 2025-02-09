import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import cities from "@/data/cities";

const CitySelect = ({ setAddress }) => {
  // Accept setAddress as a prop
  const [selectedCity, setSelectedCity] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (setAddress) {
      setAddress(selectedCity); // Notify the parent about the selected city
    }
  }, [selectedCity, setAddress]);

  if (!Array.isArray(cities?.provinces)) {
    console.error("Lỗi: cities không phải là một mảng", cities);
    return <p>Không có dữ liệu tỉnh/thành</p>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Label htmlFor="address">Address</Label>
      <PopoverTrigger asChild>
        <button className="w-full border p-2 rounded flex justify-between">
          {selectedCity || "Select a province/city"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            className="w-full"
            placeholder="Tìm kiếm tỉnh/thành..."
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {cities?.provinces?.map((city) => (
                <CommandItem
                  key={city.code}
                  onSelect={() => {
                    setSelectedCity(city.name);
                    setOpen(false);
                  }}
                >
                  {city.name}
                  {selectedCity === city.name && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CitySelect;
