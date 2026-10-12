package org.acme;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

/** Example JPA entity. */
@Entity
public class MyEntity {
    @Id
    @GeneratedValue
    public Long id;

    public String field;
}
