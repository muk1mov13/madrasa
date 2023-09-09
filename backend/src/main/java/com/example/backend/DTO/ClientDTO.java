package com.example.backend.DTO;

import com.example.backend.Entity.WeekDay;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    private String name;
    private String companyName;
    private UUID territory;
    @NotBlank(message = "address is empty!")
    @NotNull(message = "address should not be null")
    private String address;
    @NotBlank(message = "phone is empty!")
    @NotNull(message = "phone should not be null")
    private String phone;
    private String referencePoint;
    private String tin;
    private Integer category;
    private boolean active;
    private List<WeekDay> weekdays;
    private double longitude;
    private double latitude;
}
